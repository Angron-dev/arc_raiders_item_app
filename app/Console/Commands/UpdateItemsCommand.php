<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\UpdateItemsRequest;

class UpdateItemsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'items:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch items from ARC Raiders API and update local database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(UpdateItemsRequest $updateItemsRequest)
    {
        $this->info('Updating items from ARC Raiders API...');

        $updateItemsRequest->updateItemsInDatabase();

        $this->info('Items updated successfully!');
        return 0;
    }
}
