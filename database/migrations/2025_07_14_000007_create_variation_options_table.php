<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('variation_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('variation_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->decimal('price_modifier', 10, 2)->default(0);
            $table->string('sku_suffix')->nullable();
            $table->timestamps();
            
            $table->index('variation_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('variation_options');
    }
};